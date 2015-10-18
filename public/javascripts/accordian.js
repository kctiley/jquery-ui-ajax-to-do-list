$(document).ready(function(){

  console.log("Document loaded...")

  // //Cache orders, name, and drink
  // var $orders = $('#listOfOrders');
  // var $inputName = $('#inputName');
  // var $inputDrink = $('#inputDrink');

  var $health = $('#health');
  var $wealth = $('#wealth');
  var $soul = $('#soul');

  //Show database orders on page load
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: function(allOfTheTasks){
      $.each(allOfTheTasks, function(i, each){
        if(each.category == 'health'){
          $health.append('<li>' + each.description + '</li>');
        }
        if(each.category == 'wealth'){
          $wealth.append('<li>' + each.description + '</li>');
        }
        if(each.category == 'soul'){
          $soul.append('<li>' + each.description + '</li>');
        }
      })

      //Accordion functionality, with drag/drop/sort ***********************
      $(function() {
        $( "#tasks" ).accordion();
        $( "#tasks li" ).draggable({
          appendTo: "body",
          helper: "clone"
        });
        $( "#plan ol" ).droppable({
          activeClass: "ui-state-default",
          hoverClass: "ui-state-hover",
          accept: ":not(.ui-sortable-helper)",
          drop: function( event, ui ) {
            $( this ).find( ".placeholder" ).remove();
            $( "<li></li>" ).text( ui.draggable.text() ).appendTo( this );
            $(ui.draggable).remove(); //remove from list
          }
        }).sortable({
          items: "li:not(.placeholder)",
          sort: function() {
            // gets added unintentionally by droppable interacting with sortable
            // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
            $( this ).removeClass( "ui-state-default" );
          }
        });
      });

      //THIS ADDS ABILITY TO DRAG FROM PLAN  TO TASKS
      $(function() {
        
        $( "#plan li" ).draggable({
          appendTo: "body",
          helper: "clone"
        });
        $( "#tasks ul" ).droppable({
          activeClass: "ui-state-default",
          hoverClass: "ui-state-hover",
          accept: ":not(.ui-sortable-helper)",
          drop: function( event, ui ) {
            $( this ).find( ".placeholder" ).remove();
            $( "<li></li>" ).text( ui.draggable.text() ).appendTo( this );
            $(ui.draggable).remove(); //remove from list
          }
        }).sortable({
          items: "li:not(.placeholder)",
          sort: function() {
            // gets added unintentionally by droppable interacting with sortable
            // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
            $( this ).removeClass( "ui-state-default" );
          }
        });
      });


    },
    error: function(){
      alert('Error loading orders')
    }
  })


  //Add task
  $('#btnAddTask').on('click', function(){

    var task = {
      category: $(inputCategory).val(),
      description: $(inputDescription).val()
    };

    $.ajax({
      type: 'POST',
      url: '/tasks',
      data: task,
      success: function(){

        if(task.category == 'health'){
          $health.append('<li>' + task.description + '</li>');
        }
        if(task.category == 'wealth'){
          $wealth.append('<li>' + task.description + '</li>');
        }
        if(task.category == 'soul'){
          $soul.append('<li>' + task.description + '</li>');
        }
      },
      error: function(){
        alert('Error adding task')
      },        
    })  
  })



})

