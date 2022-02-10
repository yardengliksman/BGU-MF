let actions       = [];
let answers_good  = [0,0,0,0];
let answers_wrong = [0,0,0,0];

let answers         = [];
let num_of_trials   = 0;
let include_zero    = false;
let type            = -1;

let changed          = false;
let stt              = 0; // start time
let ret              = 0; // response time
let set              = 0; // send time

let timer;


$(document).ready(function()
{
    const queryString   = window.location.search;
    const urlParams     = new URLSearchParams(queryString);
    const add   = urlParams.get('add')   ? urlParams.get('add')   : 2;
    const sub   = urlParams.get('sub')   ? urlParams.get('sub')   : 2;
    const mult  = urlParams.get('mult')  ? urlParams.get('mult')  : 2;
    const div   = urlParams.get('div')   ? urlParams.get('div')   : 2;
    const zeros = urlParams.get('zeros') ? urlParams.get('zeros') : 1;

    timer = urlParams.get('timer') ? urlParams.get('timer') : 180;


    actions = [add, sub, mult, div];
    include_zero = (zeros>0);

    $('#inst1').show();
    //first character
    $('#inp').keypress(function(e){keypress_action(e);});
    //send answer
    $('#send').click(function(){send_answer();});


});



function download_csv(csv, filename) {

    const csvFile = new Blob([csv], {type: "text/csv"});

    let downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink);

    downloadLink.click();
}

function export_table_to_csv(filename) {
    let csv = [];
    let rows = document.querySelectorAll("table tr");

    for (let i = 0; i < rows.length; i++) {
        let row = [], cols = rows[i].querySelectorAll("td, th");
        for (let j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);
        csv.push(row.join(","));
    }

    download_csv(csv.join("\n"), filename);
}

function average( arr) {
    return arr.reduce((sume, el) => sume + el, 0) / arr.length
}



function start()
{
    let countdown = setInterval(function () {
        if (timer === 0) {
                clearInterval(countdown);
                let table1 = '<div class=\'box results\'><table id=\'t1\'><tr><th>#</th><th>Problem</th><th>Participant response</th><th>Correct response</th><th>Time to enter first digit (either one of one or one of two digits)</th><th>Time to complete response (time to click enter)</th></tr>';
                let accurate = '';
                let tr_class = 'right_answer';

                for(let i=1; i<answers.length; i++)
                {
                    if(!answers[i]['answer'])
                        continue;
                    accurate = answers[i]['accurate'] ? 'yes' : 'no';
                    tr_class = answers[i]['accurate'] ? 'right_answer' : 'wrong_answer';
                    table1+='<tr class=\''+tr_class+'\'><td>'+i+'</td><td>'+answers[i]['statement_str']+'</td><td>'+answers[i]['answer']+'</td><td>'+accurate+'</td><td>'+answers[i]['ret']+'</td><td>'+answers[i]['set']+'</td></tr>';
                }
                const add_mean  = Math.round(average(answers.filter(answer=>answer.type === 0 && answer.accurate).map(answer=>answer.set)));
                const sub_mean  = Math.round(average(answers.filter(answer=>answer.type === 1 && answer.accurate).map(answer=>answer.set)));
                const mult_mean = Math.round(average(answers.filter(answer=>answer.type === 2 && answer.accurate).map(answer=>answer.set)));
                const freq_mean = Math.round(average(answers.filter(answer=>answer.type === 3 && answer.accurate).map(answer=>answer.set)));

            table1+='</table></div>';
                const text1  = '<div class=\'box results\'><h1>The experiment has been completed.</h1><p>The table below provides the results of this participant.</p></div>';
                const table2 = '<div class=\'box results\'><p>The table below provides the summary of the results of this participant</p>'+
                                    '<table><tr><th>Type of exercise</th><th>Number of correct responses out of total number of exercise of this type (in partehteses)</th><th>Mean response time (for correct responses)</th></tr>'+
                                        '<tr><td>Addition</td><td>'+answers_good[0]+' ('+(answers_good[0]+answers_wrong[0])+') </td><td>'+add_mean+'</td></tr>'+
                                        '<tr><td>Subtraction</td><td>'+answers_good[1]+' ('+(answers_good[1]+answers_wrong[1])+') </td><td>'+sub_mean+'</td></tr>'+
                                        '<tr><td>Multiplication</td><td>'+answers_good[2]+' ('+(answers_good[2]+answers_wrong[2])+') </td><td>'+mult_mean+'</td></tr>'+
                                        '<tr><td>Division</td><td>'+answers_good[3]+' ('+(answers_good[3]+answers_wrong[3])+') </td><td>'+freq_mean+'</td></tr>'+
                                    '</table></div>';
                const text2  = '<div class=\'box results\'><h1>   </h1></div>';


                const button = '<div class=\'box results\'><button id=\'export\'>Export to CSV file</button></div>';

                $('#page').html(text1 + table1 + table2 + text2 + button);
                document.querySelector("#export").addEventListener("click", function () {
                    return export_table_to_csv("results.csv");
                });


        }
            timer--;
    }, 1000);

    $('#inst').hide();
    init_next();
    $('#page').show();
}

function go2a()
{
   $('.inst').hide();
   $('#inst2').show();
}

function go2b()
{
    $('.inst').hide();
    $('#inst3').show();
}

function add_and_sub(level, sub)
{
    let statement = [];
    let min_value = include_zero ? 0 : 1;
    let max_value = 10;

    if(level>1)
        max_value = 20;
    max_value--;

    const first = Math.floor(Math.random()*(max_value-min_value+1)+min_value);
    max_value -= first-1;
    
    if(level===2)
        min_value = Math.max(1, 11-first);
    const second = Math.floor(Math.random()*(max_value-min_value+1)+min_value);
    if(sub)
    {
        statement['statement_str']  = (first+second)+'-'+first;
        statement['value']  = second;
        return statement;
    }
    statement['statement_str']  = first+'+'+second;
    statement['value']          = first+second;
    return statement;
}

function mult_and_frec(level, frec)
{
    let statement = [];
    const min_value = include_zero ? 0 :1;
    let max_value = 5;
    if(level>1)
        max_value = 10;
    
    const first = Math.floor(Math.random()*(max_value-min_value+1)+min_value);
    
    if(level===2 && first >5)
        max_value = 5;

    const second = Math.floor(Math.random()*(max_value-min_value+1)+min_value);
    if(frec)
    {
        if(first+second === 0)
            return mult_and_frec(level, frec);
        if(first*second === 0)
        {
            statement['statement_str']  = (first*second)+'÷'+Math.max(first, second);
            statement['value']          = first*second/Math.max(first,second);
            return statement;
        }
        statement['statement_str']  = (first*second)+'÷'+first;
        statement['value']          = second;
        return statement;
    }
    statement['statement_str']  = first+'X'+second;
    statement['value']          = first*second;
    return statement;
}

function init_next()
{
    num_of_trials++;
    answers[num_of_trials] = [];
    let action = -1;
    while (action === -1)
    {
        action = Math.floor(Math.random() * 4);
        action = actions[action]>0 ? action : -1;
    }
    let statement;
    let statement_str;
    type = action;
    switch(action)
    {
        case 0:
            statement = add_and_sub(actions[action], false);
            break;
        case 1:
            statement = add_and_sub(actions[action], true);
            break;
        case 2:
            statement = mult_and_frec(actions[action], false);
            break;
        case 3:
            statement = mult_and_frec(actions[action], true);
            break;
    }
    statement_str = statement['statement_str'];
    answers[num_of_trials]['statement_str'] = statement_str;
    $('#res').val(statement['value']);
    let finish = false;
    if(finish)
        return $('.box').html('');

    $('#inp').removeClass('empty');
    $('.box').hide().show();

    setTimeout(function() { $('#inp').val('').focus() }, 10);

    $('#changeit').html(statement_str+'=');
    stt = $.now();
}

function keypress_action(e){
    $('#inp').removeClass('empty');
    if(e.which === 13)
        return send_answer();
    if(!changed){
        ret     = $.now();
        changed = true;
    }

}

function send_answer()
{
    if(!$('#inp').val() || isNaN($('#inp').val()))
        return $('#inp').addClass('empty');

    set = $.now();
    send_respons(stt, ret, set);

    // init next
    init_next();
    changed = false;
}

function send_respons(stt, ret, set){
    const answer    = $('#inp').val();
    const result    = $('#res').val();
    answers[num_of_trials]['answer']    = answer;
    answers[num_of_trials]['accurate']  = result===answer;
    answers[num_of_trials]['ret']       = ret-stt;
    answers[num_of_trials]['set']       = set-stt;
    answers[num_of_trials]['type']      = type;

    console.log(answers[num_of_trials]);
    if(answer===result)
        answers_good[type]++;
    else
        answers_wrong[type]++;

    /* optional */
    // $.post('your server',
    //     {action: 'send_answer',
    //         stimulate: $('#changeit').html(),
    //         answer: answer,
    //         is_correct: result===answer,
    //         stt: stt,
    //         ret: ret,
    //         set: set
    //         },
    //     function(ret){
    //     // any action
    //     });
}
