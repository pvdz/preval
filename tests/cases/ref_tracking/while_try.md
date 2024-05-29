# Preval test case

# while_try.md

> Ref tracking > While try
>
> A let binding defined in an outer block than the nested while

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
if ($) {
  $('if', x);
  try {
    $('try', x);
    while (true) {
      $('try-while', x);
      while (true) {
        $('try-while-while', x);
        if ($) {
          $(x); // Can still see 2 due to outer loop
        } else {
          $(x);
          x = 2;
          break;
        }
      }
      if ($()) {
        $('end?', x);
        break;
      }
      $('no end', x);
    }
    $('after while', x);
  } catch (e) {
    $('catch', x);
  } finally {
    $('finally', x);
  }
  $('posttry', x);
} else {
  $('oh', x);
}
$('end', x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
if ($) {
  /*8*/ $(`if`, x___14__);
  try /*16*/ {
    try /*18*/ {
      $(`try`, x___24__);
      while (true) {
        /*27*/ $(`try-while`, x___33__);
        while (true) {
          /*36*/ $(`try-while-while`, x___42__);
          if ($) {
            /*45*/ $(x___49__);
          } /*50*/ else {
            $(x___54__);
            x___58__ = 2;
            break;
          }
        }
        const tmpIfTest___62__ = $();
        if (tmpIfTest___66__) {
          /*67*/ $(`end?`, x___73__);
          break;
        } /*75*/ else {
          $(`no end`, x___81__);
        }
      }
      $(`after while`, x___87__);
    } catch (e___89__) /*90*/ {
      $(`catch`, x___96__);
    }
  } finally /*97*/ {
    $(`finally`, x___103__);
  }
  $(`posttry`, x___109__);
} /*110*/ else {
  $(`oh`, x___116__);
}
$(`end`, x___122__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 14,24,33,42,49,54,96,103,109,116,122 | none           | 58
  - r @14      | 4
  - r @24      | 4
  - r @33      | 4,58
  - r @42      | 4,58
  - r @49      | 4,58
  - r @54      | 4,58
  - w @58      | ########## | 33,42,49,54,73,81,87,96,103,109,122 | 4,58           | 58
  - r @73      | 58
  - r @81      | 58
  - r @87      | 58
  - r @96      | 4,58
  - r @103     | 4,58
  - r @109     | 4,58
  - r @116     | 4
  - r @122     | 4,58

tmpIfTest:
  - w @62      | ########## | 66          | none           | none
  - r @66      | 62
