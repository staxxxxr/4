
var $addTaskInput = $('#add-task-input'); // 输入框元素
var $jsAddTask = $('#js-add-task'); // 添加任务按钮
var $content = $('.todoList-content'); // 任务内容元素

/**
 * 任务元素 html 模板函数
 * @param [String] title 任务标题
 */
function taskTpl(value) {
  return (
    '<li class="task">'+
      '<p lass="text">' + value + '</p>'+
      '<span class="close">x</span>'+
    '</li>');
}

// 为添加按钮绑定事件
$jsAddTask.on('click', function() {
  // 获取输入框内容,使用 trim 去除字符串左右两端的空格
  var newTaskTitle = $addTaskInput.val().trim();
  if (newTaskTitle === '') {
      return;
  }
  //获取并添加新内容
  var newTaskHtml = taskTpl(newTaskTitle);
  $content.append(newTaskHtml);
});

// 使用事件委托绑定任务元素点击事件
$content.on('click', '.task', function() {
  // toggle class checked
  $(this).toggleClass('checked');
});

// 使用事件委托绑定关闭按钮点击事件
$content.on('click', '.close', function() {
  // 获取关闭按钮的父元素 task
  var $task = $(this).parent();
  // 去除任务元素
  $task.remove();
});