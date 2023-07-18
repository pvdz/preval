# Preval test case

# ident_logic_and_simple_simple2.md

> Normalize > Expressions > Assignments > Template > Ident logic and simple simple2
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 && 2) + `after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 && 2) + `after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = 1;
if (a) {
  a = 2;
} else {
}
let tmpBinLhs = a;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
$(`2after`);
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( "2after" );
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '2after'
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
