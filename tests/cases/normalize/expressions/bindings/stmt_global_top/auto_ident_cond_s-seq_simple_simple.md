# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident cond s-seq simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let a = (10, 20, 30) ? $(2) : $($(100));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = (10, 20, 30) ? $(2) : $($(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  a = $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
$(a);
`````

## Output


`````js filename=intro
const a /*:unknown*/ = $(2);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
