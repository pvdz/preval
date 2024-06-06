# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = void $(100)) || (a = void $(100)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = void $(100)) || (a = void $(100)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(100);
a = undefined;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  $(100);
  const tmpNestedComplexRhs = undefined;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
$(100);
$(100);
$(undefined);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( 100 );
$( undefined );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: undefined
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
