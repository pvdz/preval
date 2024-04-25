# Preval test case

# decl_after.md

> Normalize > Dce > Break > Decl after
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  if ($(false)) x = $('fail too');
  break;
  
  let x = $('fail');
}
$('after');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  if ($(false)) $(`fail too`), $throwTDZError(`Preval: TDZ triggered for this assignment: x = \$('fail too')`);
  break;
  let x = $(`fail`);
}
$(`after`);
`````

## Normalized

`````js filename=intro
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    const tmpIfTest$1 = $(false);
    if (tmpIfTest$1) {
      $(`fail too`);
      throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
    } else {
      break;
      let x = 0;
    }
  } else {
    break;
  }
}
$(`after`);
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
  const tmpIfTest$1 = $(false);
  if (tmpIfTest$1) {
    $(`fail too`);
    throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
  } else {
    $tmpLoopUnrollCheck = false;
  }
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpIfTest$2 = $(false);
      if (tmpIfTest$2) {
        $(`fail too`);
        throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
      } else {
        break;
      }
    } else {
      break;
    }
  }
} else {
}
$(`after`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
let b = true;
if (a) {
  const c = $( false );
  if (c) {
    $( "fail too" );
    throw "Preval: TDZ triggered for this assignment: x = $('fail too')";
  }
  else {
    b = false;
  }
}
else {
  b = false;
}
if (b) {
  while ($LOOP_UNROLL_10) {
    if (a) {
      const d = $( false );
      if (d) {
        $( "fail too" );
        throw "Preval: TDZ triggered for this assignment: x = $('fail too')";
      }
      else {
        break;
      }
    }
    else {
      break;
    }
  }
}
$( "after" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: false
 - 3: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
