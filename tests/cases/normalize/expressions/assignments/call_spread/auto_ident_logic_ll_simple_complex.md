# Preval test case

# auto_ident_logic_ll_simple_complex.md

> Normalize > Expressions > Assignments > Call spread > Auto ident logic ll simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = 0 || $($(1))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = 0 || $($(1))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = 0;
if (a) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee$1(tmpCalleeParam);
}
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam);
$(...a);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
$( ...b );
$( b );
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
