# Preval test case

# necessary_continue_label.md

> Labels > Necessary continue label
>
> The label is necessary here since an unqualified continue would implicitly target the inner loop.

#TODO

## Input

`````js filename=intro
foo: do {
  $(1, 'outer');
  do {
    $(1, 'inner');
    continue foo;
  } while ($(false));
} while ($(false));
`````

## Pre Normal


`````js filename=intro
foo: while (true) {
  {
    $continue: {
      {
        $(1, `outer`);
        while (true) {
          {
            $(1, `inner`);
            break $continue;
          }
          if ($(false)) {
          } else {
            break;
          }
        }
      }
    }
  }
  if ($(false)) {
  } else {
    break;
  }
}
`````

## Normalized


`````js filename=intro
while (true) {
  $(1, `outer`);
  $(1, `inner`);
  const tmpIfTest = $(false);
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
$(1, `outer`);
$(1, `inner`);
const tmpIfTest = $(false);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(1, `outer`);
    $(1, `inner`);
    const tmpIfTest$1 = $(false);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 1, "outer" );
$( 1, "inner" );
const a = $( false );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1, "outer" );
    $( 1, "inner" );
    const b = $( false );
    if (b) {

    }
    else {
      break;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'outer'
 - 2: 1, 'inner'
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
