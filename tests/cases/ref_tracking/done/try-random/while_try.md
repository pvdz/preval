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
  /*8*/ $(`if`, x___14__);
  let $implicitThrow___17__ = false;
  let $finalCatchArg___21__ = undefined___22__;
  try /*24*/ {
    $(`try`, x___30__);
    while (true) {
      /*33*/ $(`try-while`, x___39__);
      while (true) {
        /*42*/ $(`try-while-while`, x___48__);
        if ($) {
          /*51*/ $(x___55__);
        } /*56*/ else {
          $(x___60__);
          x___64__ = 2;
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


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 14,30,39,48,55,60,102,135,141 | none           | 64
  - r @14      | 4
  - r @30      | 4
  - r @39      | 4,64
  - r @48      | 4,64
  - r @55      | 4,64
  - r @60      | 4,64
  - w @64      | ########## | 39,48,55,60,79,87,93,102,110,122,128 | 4,64           | 64
  - r @79      | 64
  - r @87      | 64
  - r @93      | 64
  - r @102     | 4,64
  - r @110     | 64
  - r @122     | 64
  - r @128     | 64
  - r @135     | 4
  - r @141     | 4

$implicitThrow:
  - w @17          | ########## | 112         | none           | none
  - r @112         | 17

$finalCatchArg:
  - w @21          | ########## | 115         | none           | none
  - r @115         | 21

tmpIfTest:
  - w @68          | ########## | 72          | none           | none
  - r @72          | 68
