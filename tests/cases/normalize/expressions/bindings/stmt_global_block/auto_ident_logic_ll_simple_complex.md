# Preval test case

# auto_ident_logic_ll_simple_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident logic ll simple complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = 0 || $($(1));
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let a = 0 || $($(1));
  $(a);
}
`````

## Normalized


`````js filename=intro
let a = 0;
if (a) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
