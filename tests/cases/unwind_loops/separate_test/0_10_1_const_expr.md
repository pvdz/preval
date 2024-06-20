# Preval test case

# 0_10_1_const_expr.md

> Unwind loops > Separate test > 0 10 1 const expr
>
> Unrolling loops

## Input

`````js filename=intro
for (let i=0; i<10; ++i) {
 const x = i * 2;
  $(x);
}
`````

## Pre Normal


`````js filename=intro
{
  let i = 0;
  while (i < 10) {
    {
      const x = i * 2;
      $(x);
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
    const x = i * 2;
    $(x);
    i = i + 1;
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
$(0);
$(2);
$(4);
$(6);
$(8);
$(10);
$(12);
$(14);
$(16);
$(18);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
$( 2 );
$( 4 );
$( 6 );
$( 8 );
$( 10 );
$( 12 );
$( 14 );
$( 16 );
$( 18 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 2
 - 3: 4
 - 4: 6
 - 5: 8
 - 6: 10
 - 7: 12
 - 8: 14
 - 9: 16
 - 10: 18
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
