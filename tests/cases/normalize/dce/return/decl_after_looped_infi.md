# Preval test case

# decl_after_looped_infi.md

> Normalize > Dce > Return > Decl after looped infi
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

The loop case is harder because here it is not guaranteed to be a TDZ error.

## Input

`````js filename=intro
function f() {
  while (true) {
    if ($(false)) {
      x = $('fail too');
    }
    continue;
      
    let x = $('fail');
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    if ($(false)) {
      $(`fail too`), $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
    }
    continue;
    let x = $(`fail`);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    const tmpIfTest = $(false);
    if (tmpIfTest) {
      $(`fail too`);
      $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
    } else {
    }
    continue;
    let x = $(`fail`);
  }
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpIfTest = $(false);
if (tmpIfTest) {
  $(`fail too`);
  $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
} else {
}
const tmpIfTest$1 = $(false);
if (tmpIfTest$1) {
  $(`fail too`);
  $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
} else {
}
const tmpIfTest$2 = $(false);
if (tmpIfTest$2) {
  $(`fail too`);
  $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
} else {
}
const tmpIfTest$3 = $(false);
if (tmpIfTest$3) {
  $(`fail too`);
  $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
} else {
}
const tmpIfTest$4 = $(false);
if (tmpIfTest$4) {
  $(`fail too`);
  $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
} else {
}
const tmpIfTest$5 = $(false);
if (tmpIfTest$5) {
  $(`fail too`);
  $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
} else {
}
const tmpIfTest$6 = $(false);
if (tmpIfTest$6) {
  $(`fail too`);
  $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
} else {
}
const tmpIfTest$7 = $(false);
if (tmpIfTest$7) {
  $(`fail too`);
  $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
} else {
}
const tmpIfTest$8 = $(false);
if (tmpIfTest$8) {
  $(`fail too`);
  $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
} else {
}
const tmpIfTest$9 = $(false);
if (tmpIfTest$9) {
  $(`fail too`);
  $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
} else {
}
const tmpIfTest$10 = $(false);
if (tmpIfTest$10) {
  $(`fail too`);
  $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
} else {
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest$11 = $(false);
  if (tmpIfTest$11) {
    $(`fail too`);
    $throwTDZError(`TDZ triggered for this assignment: x = \$('fail too')`);
  } else {
  }
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  $( "fail too" );
  b( "TDZ triggered for this assignment: x = $('fail too')" );
}
const c = $( false );
if (c) {
  $( "fail too" );
  b( "TDZ triggered for this assignment: x = $('fail too')" );
}
const d = $( false );
if (d) {
  $( "fail too" );
  b( "TDZ triggered for this assignment: x = $('fail too')" );
}
const e = $( false );
if (e) {
  $( "fail too" );
  b( "TDZ triggered for this assignment: x = $('fail too')" );
}
const f = $( false );
if (f) {
  $( "fail too" );
  b( "TDZ triggered for this assignment: x = $('fail too')" );
}
const g = $( false );
if (g) {
  $( "fail too" );
  b( "TDZ triggered for this assignment: x = $('fail too')" );
}
const h = $( false );
if (h) {
  $( "fail too" );
  b( "TDZ triggered for this assignment: x = $('fail too')" );
}
const i = $( false );
if (i) {
  $( "fail too" );
  b( "TDZ triggered for this assignment: x = $('fail too')" );
}
const j = $( false );
if (j) {
  $( "fail too" );
  b( "TDZ triggered for this assignment: x = $('fail too')" );
}
const k = $( false );
if (k) {
  $( "fail too" );
  b( "TDZ triggered for this assignment: x = $('fail too')" );
}
const l = $( false );
if (l) {
  $( "fail too" );
  b( "TDZ triggered for this assignment: x = $('fail too')" );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const m = $( false );
  if (m) {
    $( "fail too" );
    b( "TDZ triggered for this assignment: x = $('fail too')" );
  }
}
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: false
 - 3: false
 - 4: false
 - 5: false
 - 6: false
 - 7: false
 - 8: false
 - 9: false
 - 10: false
 - 11: false
 - 12: false
 - 13: false
 - 14: false
 - 15: false
 - 16: false
 - 17: false
 - 18: false
 - 19: false
 - 20: false
 - 21: false
 - 22: false
 - 23: false
 - 24: false
 - 25: false
 - 26: false
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
