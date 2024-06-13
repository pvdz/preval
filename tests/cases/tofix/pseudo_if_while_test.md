# Preval test case

# pseudo_if_while_test.md

> Tofix > Pseudo if while test

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
      const tmpClusterSSA_test = $(y);
      if (tmpClusterSSA_test) {
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

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = $( 1 );
let c = $( b );
if (c) {
  $( 100 );
  c = true;
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    if (c) {
      const d = $( 1 );
      const e = $( d );
      if (e) {
        $( 100 );
        c = true;
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
const f = {
  a: 999,
  b: 1000,
};
$( f );
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
