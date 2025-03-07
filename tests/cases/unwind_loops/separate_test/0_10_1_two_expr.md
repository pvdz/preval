# Preval test case

# 0_10_1_two_expr.md

> Unwind loops > Separate test > 0 10 1 two expr
>
> Unrolling loops

## Input

`````js filename=intro
for (let i=0; i<10; ++i) {
  $(i, 'a');
  $(i, 'b');
}
`````

## Settled


`````js filename=intro
$(0, `a`);
$(0, `b`);
$(1, `a`);
$(1, `b`);
$(2, `a`);
$(2, `b`);
$(3, `a`);
$(3, `b`);
$(4, `a`);
$(4, `b`);
$(5, `a`);
$(5, `b`);
$(6, `a`);
$(6, `b`);
$(7, `a`);
$(7, `b`);
$(8, `a`);
$(8, `b`);
$(9, `a`);
$(9, `b`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0, `a`);
$(0, `b`);
$(1, `a`);
$(1, `b`);
$(2, `a`);
$(2, `b`);
$(3, `a`);
$(3, `b`);
$(4, `a`);
$(4, `b`);
$(5, `a`);
$(5, `b`);
$(6, `a`);
$(6, `b`);
$(7, `a`);
$(7, `b`);
$(8, `a`);
$(8, `b`);
$(9, `a`);
$(9, `b`);
`````

## Pre Normal


`````js filename=intro
{
  let i = 0;
  while (i < 10) {
    {
      $(i, `a`);
      $(i, `b`);
    }
    ++i;
  }
}
`````

## Normalized


`````js filename=intro
let i = 0;
while (true) {
  const tmpIfTest = i < 10;
  if (tmpIfTest) {
    $(i, `a`);
    $(i, `b`);
    i = i + 1;
  } else {
    break;
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 0, "a" );
$( 0, "b" );
$( 1, "a" );
$( 1, "b" );
$( 2, "a" );
$( 2, "b" );
$( 3, "a" );
$( 3, "b" );
$( 4, "a" );
$( 4, "b" );
$( 5, "a" );
$( 5, "b" );
$( 6, "a" );
$( 6, "b" );
$( 7, "a" );
$( 7, "b" );
$( 8, "a" );
$( 8, "b" );
$( 9, "a" );
$( 9, "b" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0, 'a'
 - 2: 0, 'b'
 - 3: 1, 'a'
 - 4: 1, 'b'
 - 5: 2, 'a'
 - 6: 2, 'b'
 - 7: 3, 'a'
 - 8: 3, 'b'
 - 9: 4, 'a'
 - 10: 4, 'b'
 - 11: 5, 'a'
 - 12: 5, 'b'
 - 13: 6, 'a'
 - 14: 6, 'b'
 - 15: 7, 'a'
 - 16: 7, 'b'
 - 17: 8, 'a'
 - 18: 8, 'b'
 - 19: 9, 'a'
 - 20: 9, 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
