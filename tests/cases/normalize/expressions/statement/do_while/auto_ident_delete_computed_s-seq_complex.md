# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident delete computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (delete ($(1), $(2), arg)[$("y")]);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = delete ($(1), $(2), arg)[$(`y`)];
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    $(1);
    $(2);
    const tmpDeleteCompObj = arg;
    const tmpDeleteCompProp = $(`y`);
    tmpDoWhileFlag = delete tmpDeleteCompObj[tmpDeleteCompProp];
  } else {
    break;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
$(100);
$(1);
$(2);
const tmpDeleteCompProp = $(`y`);
const tmpDoWhileFlag = delete arg[tmpDeleteCompProp];
if (tmpDoWhileFlag) {
  $(100);
  $(1);
  $(2);
  const tmpDeleteCompProp$1 = $(`y`);
  let tmpClusterSSA_tmpDoWhileFlag = delete arg[tmpDeleteCompProp$1];
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      $(1);
      $(2);
      const tmpDeleteCompProp$2 = $(`y`);
      tmpClusterSSA_tmpDoWhileFlag = delete arg[tmpDeleteCompProp$2];
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
const a = { y: 1 };
const b = {
a: 999,
b: 1000
;
$( 100 );
$( 1 );
$( 2 );
const c = $( "y" );
const d = deletea[ c ];
if (d) {
  $( 100 );
  $( 1 );
  $( 2 );
  const e = $( "y" );
  let f = deletea[ e ];
  while ($LOOP_UNROLL_9) {
    if (f) {
      $( 100 );
      $( 1 );
      $( 2 );
      const g = $( "y" );
      f = deletea[ g ];
    }
    else {
      break;
    }
  }
}
$( b, a );
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
