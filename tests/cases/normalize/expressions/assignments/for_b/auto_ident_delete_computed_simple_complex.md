# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; (a = delete arg[$("y")]); $(1));
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
let a /*:boolean*/ = delete arg[tmpDeleteCompProp];
if (a) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
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

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
let a = delete arg[tmpDeleteCompProp];
if (a) {
  while (true) {
    $(1);
    const tmpDeleteCompProp$1 = $(`y`);
    a = delete arg[tmpDeleteCompProp$1];
    if (!a) {
      break;
    }
  }
}
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while ((a = delete arg[$(`y`)])) {
    $(1);
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpDeleteCompObj = arg;
  const tmpDeleteCompProp = $(`y`);
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "y" );
const b = { y: 1 };
let c = delete b[ a ];
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const d = $( "y" );
    c = delete b[ d ];
    if (c) {

    }
    else {
      break;
    }
  }
}
$( c, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'y'
 - 2: 1
 - 3: 'y'
 - 4: 1
 - 5: 'y'
 - 6: 1
 - 7: 'y'
 - 8: 1
 - 9: 'y'
 - 10: 1
 - 11: 'y'
 - 12: 1
 - 13: 'y'
 - 14: 1
 - 15: 'y'
 - 16: 1
 - 17: 'y'
 - 18: 1
 - 19: 'y'
 - 20: 1
 - 21: 'y'
 - 22: 1
 - 23: 'y'
 - 24: 1
 - 25: 'y'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check