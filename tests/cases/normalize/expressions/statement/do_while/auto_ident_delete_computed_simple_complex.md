# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident delete computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (delete arg[$("y")]);
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
    tmpDoWhileFlag = delete arg[$(`y`)];
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
const tmpDeleteCompProp = $(`y`);
let tmpDoWhileFlag = delete arg[tmpDeleteCompProp];
if (tmpDoWhileFlag) {
  $(100);
  const tmpDeleteCompProp$1 = $(`y`);
  tmpDoWhileFlag = delete arg[tmpDeleteCompProp$1];
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      const tmpDeleteCompProp$2 = $(`y`);
      tmpDoWhileFlag = delete arg[tmpDeleteCompProp$2];
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
const c = $( "y" );
let d = deletea[ c ];
if (d) {
  $( 100 );
  const e = $( "y" );
  d = deletea[ e ];
  while ($LOOP_UNROLL_9) {
    if (d) {
      $( 100 );
      const f = $( "y" );
      d = deletea[ f ];
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
 - 2: 'y'
 - 3: 100
 - 4: 'y'
 - 5: 100
 - 6: 'y'
 - 7: 100
 - 8: 'y'
 - 9: 100
 - 10: 'y'
 - 11: 100
 - 12: 'y'
 - 13: 100
 - 14: 'y'
 - 15: 100
 - 16: 'y'
 - 17: 100
 - 18: 'y'
 - 19: 100
 - 20: 'y'
 - 21: 100
 - 22: 'y'
 - 23: 100
 - 24: 'y'
 - 25: 100
 - 26: 'y'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
