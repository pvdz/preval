# Preval test case

# auto_ident_cond_simple_complex_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident cond simple complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(1 ? $(2) : $($(100))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(1 ? $(2) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread = undefined;
tmpCalleeParamSpread = $(2);
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParamSpread /*:unknown*/ = $(2);
$(...tmpCalleeParamSpread);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
$( ...a );
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
