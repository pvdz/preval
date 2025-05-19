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
  } catch (e___95__) /*96*/ {
    try /*98*/ {
      $(`catch`, x___104__);
    } catch ($finalImplicit___106__) /*107*/ {
      $(`finally`, x___113__);
      throw $finalImplicit___115__;
    }
  }
  $(`finally`, x___121__);
  if ($implicitThrow___123__) {
    /*124*/ throw $finalCatchArg___126__;
  } /*127*/ else {
    $(`posttry`, x___133__);
    $(`end`, x___139__);
  }
} /*140*/ else {
  $(`oh`, x___146__);
  $(`end`, x___152__);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 16,30,40,49,56,61,104,113,121,133,139,146,152 | none           | 65
  - r @16      | 4
  - r @30      | 4
  - r @40      | 4,65
  - r @49      | 4,65
  - r @56      | 4,65
  - r @61      | 4,65
  - w @65      | ########## | 40,49,56,61,79,87,93,104,113,121,133,139 | 4,65           | 65
  - r @79      | 65
  - r @87      | 65
  - r @93      | 65
  - r @104     | 4,65
  - r @113     | 4,65
  - r @121     | 4,65
  - r @133     | 4,65
  - r @139     | 4,65
  - r @146     | 4
  - r @152     | 4

$implicitThrow:
  - w @18          | ########## | 123         | none           | none
  - r @123         | 18

$finalCatchArg:
  - w @21          | ########## | 126         | none           | none
  - r @126         | 21

tmpIfTest:
  - w @68          | ########## | 72          | none           | none
  - r @72          | 68
