# Preval test case

# while_try.md

> Ref tracking > Done > Try-random > While try
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
  /*8*/ $(`if`, x___16__);
  let $implicitThrow___18__ = false;
  let $finalCatchArg___21__ = undefined___22__;
  try /*24*/ {
    $(`try`, x___30__);
    while (true) {
      /*33*/ $(`try-while`, x___40__);
      while (true) {
        /*43*/ $(`try-while-while`, x___49__);
        if ($) {
          /*52*/ $(x___56__);
        } /*57*/ else {
          $(x___61__);
          x___65__ = 2;
          break;
        }
      }
      const tmpIfTest___68__ = $();
      if (tmpIfTest___72__) {
        /*73*/ $(`end?`, x___79__);
        break;
      } /*81*/ else {
        $(`no end`, x___87__);
      }
    }
    $(`after while`, x___93__);
  } catch ($finalImplicit___95__) /*96*/ {
    $(`finally`, x___102__);
    throw $finalImplicit___104__;
  }
  $(`finally`, x___110__);
  if ($implicitThrow___112__) {
    /*113*/ throw $finalCatchArg___115__;
  } /*116*/ else {
    $(`posttry`, x___122__);
    $(`end`, x___128__);
  }
} /*129*/ else {
  $(`oh`, x___135__);
  $(`end`, x___141__);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 16,30,40,49,56,61,102,135,141 | none           | 65
  - r @16      | 4
  - r @30      | 4
  - r @40      | 4,65
  - r @49      | 4,65
  - r @56      | 4,65
  - r @61      | 4,65
  - w @65      | ########## | 40,49,56,61,79,87,93,102,110,122,128 | 4,65           | 65
  - r @79      | 65
  - r @87      | 65
  - r @93      | 65
  - r @102     | 4,65
  - r @110     | 65
  - r @122     | 65
  - r @128     | 65
  - r @135     | 4
  - r @141     | 4

$implicitThrow:
  - w @18          | ########## | 112         | none           | none
  - r @112         | 18

$finalCatchArg:
  - w @21          | ########## | 115         | none           | none
  - r @115         | 21

tmpIfTest:
  - w @68          | ########## | 72          | none           | none
  - r @72          | 68
