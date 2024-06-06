# Preval test case

# decl_after.md

> Normalize > Dce > Continue > Decl after
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  if ($(false)) x = $('fail too');
  continue;
  
  let x = $('fail');
}
$('after, wont eval due to infinite loop');
`````

## Pre Normal


`````js filename=intro
while ($(true)) {
  $continue: {
    {
      if ($(false)) $(`fail too`), $throwTDZError(`Preval: TDZ triggered for this assignment: x = \$('fail too')`);
      break $continue;
      let x = $(`fail`);
    }
  }
}
$(`after, wont eval due to infinite loop`);
`````

## Normalized


`````js filename=intro
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    $continue: {
      const tmpIfTest$1 = $(false);
      if (tmpIfTest$1) {
        $(`fail too`);
        throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
      } else {
        break $continue;
        let x = $(`fail`);
      }
    }
    tmpIfTest = $(true);
  } else {
    break;
  }
}
$(`after, wont eval due to infinite loop`);
`````

## Output


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 = $(false);
  if (tmpIfTest$1) {
    $(`fail too`);
    throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
  } else {
    let tmpClusterSSA_tmpIfTest = $(true);
    while ($LOOP_UNROLL_10) {
      if (tmpClusterSSA_tmpIfTest) {
        const tmpIfTest$2 = $(false);
        if (tmpIfTest$2) {
          $(`fail too`);
          throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
        } else {
          tmpClusterSSA_tmpIfTest = $(true);
        }
      } else {
        break;
      }
    }
  }
} else {
}
$(`after, wont eval due to infinite loop`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( false );
  if (b) {
    $( "fail too" );
    throw "Preval: TDZ triggered for this assignment: x = $('fail too')";
  }
  else {
    let c = $( true );
    while ($LOOP_UNROLL_10) {
      if (c) {
        const d = $( false );
        if (d) {
          $( "fail too" );
          throw "Preval: TDZ triggered for this assignment: x = $('fail too')";
        }
        else {
          c = $( true );
        }
      }
      else {
        break;
      }
    }
  }
}
$( "after, wont eval due to infinite loop" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: false
 - 3: true
 - 4: false
 - 5: true
 - 6: false
 - 7: true
 - 8: false
 - 9: true
 - 10: false
 - 11: true
 - 12: false
 - 13: true
 - 14: false
 - 15: true
 - 16: false
 - 17: true
 - 18: false
 - 19: true
 - 20: false
 - 21: true
 - 22: false
 - 23: true
 - 24: false
 - 25: true
 - 26: false
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
