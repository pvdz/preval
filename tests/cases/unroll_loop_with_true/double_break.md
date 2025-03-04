# Preval test case

# double_break.md

> Unroll loop with true > Double break
>
> Trying to unroll a while loop with `true` as condition.

## Input

`````js filename=intro
while (true) {
    const test = $('first');
    $('second');
    if (test) {
      break;
    } else if ($(test)) {
      break;
    } else {
      $('third');
    }
}
`````

## Pre Normal


`````js filename=intro
while (true) {
  const test = $(`first`);
  $(`second`);
  if (test) {
    break;
  } else if ($(test)) {
    break;
  } else {
    $(`third`);
  }
}
`````

## Normalized


`````js filename=intro
while (true) {
  const test = $(`first`);
  $(`second`);
  if (test) {
    break;
  } else {
    const tmpIfTest = $(test);
    if (tmpIfTest) {
      break;
    } else {
      $(`third`);
    }
  }
}
`````

## Output


`````js filename=intro
const test /*:unknown*/ = $(`first`);
$(`second`);
if (test) {
} else {
  const tmpIfTest /*:unknown*/ = $(test);
  if (tmpIfTest) {
  } else {
    $(`third`);
    while ($LOOP_UNROLL_10) {
      const test$1 /*:unknown*/ = $(`first`);
      $(`second`);
      if (test$1) {
        break;
      } else {
        const tmpIfTest$1 /*:unknown*/ = $(test$1);
        if (tmpIfTest$1) {
          break;
        } else {
          $(`third`);
        }
      }
    }
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "first" );
$( "second" );
if (a) {

}
else {
  const b = $( a );
  if (b) {

  }
  else {
    $( "third" );
    while ($LOOP_UNROLL_10) {
      const c = $( "first" );
      $( "second" );
      if (c) {
        break;
      }
      else {
        const d = $( c );
        if (d) {
          break;
        }
        else {
          $( "third" );
        }
      }
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'first'
 - 2: 'second'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
