# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Arr spread > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...(1 && $($(1)))];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
[...(1 && $($(1)))];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpArrElToSpread = 1;
if (tmpArrElToSpread) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpArrElToSpread = tmpCallCallee(tmpCalleeParam);
} else {
}
[...tmpArrElToSpread];
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
const tmpArrElToSpread = $(tmpCalleeParam);
[...tmpArrElToSpread];
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
[ ... b ];
const c = {
a: 999,
b: 1000
;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
