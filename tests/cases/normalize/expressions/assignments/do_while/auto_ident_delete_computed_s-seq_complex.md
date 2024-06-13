# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident delete computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = delete ($(1), $(2), arg)[$("y")]));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = delete ($(1), $(2), arg)[$(`y`)])) {
  } else {
    break;
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  $(1);
  $(2);
  const tmpDeleteCompObj = arg;
  const tmpDeleteCompProp = $(`y`);
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, arg);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(100);
$(1);
$(2);
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
let a = delete arg[tmpDeleteCompProp];
if (a) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    $(1);
    $(2);
    const tmpDeleteCompProp$1 = $(`y`);
    a = delete arg[tmpDeleteCompProp$1];
    if (a) {
    } else {
      break;
    }
  }
} else {
}
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
$( 100 );
$( 1 );
$( 2 );
const b = $( "y" );
const c = { y: 1 };
let d = delete c[ b ];
if (d) {

}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    $( 1 );
    $( 2 );
    const e = $( "y" );
    d = delete c[ e ];
    if (d) {

    }
    else {
      break;
    }
  }
}
$( d, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 'y'
 - 5: 100
 - 6: 1
 - 7: 2
 - 8: 'y'
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 'y'
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 'y'
 - 17: 100
 - 18: 1
 - 19: 2
 - 20: 'y'
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 'y'
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
