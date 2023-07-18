# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident unary tilde complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = ~$(100);
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let a = ~$(100);
  $(a);
}
`````

## Normalized

`````js filename=intro
const tmpUnaryArg = $(100);
let a = ~tmpUnaryArg;
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const a = ~tmpUnaryArg;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = ~a;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: -101
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
