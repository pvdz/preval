# Preval test case

# pseudo_if_while_test.md

> Tests > Tofix > Pseudo if while test

should restore the true/false case for alias-if-if

## Input

`````js filename=intro
let chk = true;
const x = $(1);
let test = $(x);
if (test) {
  $(100);
  test = true;
} else {
  chk = false;
}
if (chk) {
  while ($LOOP_UNROLL_10) {
    if (test) {
      const y = $(1);
      test = $(y);
      if (test) {
        $(100);
        test = true;
      } else {
        break;
      }
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Pre Normal


`````js filename=intro
let chk = true;
const x = $(1);
let test = $(x);
if (test) {
  $(100);
  test = true;
} else {
  chk = false;
}
if (chk) {
  while ($LOOP_UNROLL_10) {
    if (test) {
      const y = $(1);
      test = $(y);
      if (test) {
        $(100);
        test = true;
      } else {
        break;
      }
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Normalized


`````js filename=intro
let chk = true;
const x = $(1);
let test = $(x);
if (test) {
  $(100);
  test = true;
} else {
  chk = false;
}
if (chk) {
  while ($LOOP_UNROLL_10) {
    if (test) {
      const y = $(1);
      test = $(y);
      if (test) {
        $(100);
        test = true;
      } else {
        break;
      }
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Output


`````js filename=intro
const x = $(1);
const test = $(x);
if (test) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const y = $(1);
    const tmpClusterSSA_test = $(y);
    if (tmpClusterSSA_test) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const c = $( 1 );
    const d = $( c );
    if (d) {

    }
    else {
      break;
    }
  }
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 100
 - 4: 1
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
