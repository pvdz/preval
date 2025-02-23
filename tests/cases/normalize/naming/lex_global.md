# Preval test case

# lex_global.md

> Normalize > Naming > Lex global
>
> First a block binding shadowing a later global binding

## Input

`````js filename=intro
{
  let a = $(1);
  $(a);
}
let a = $(2);
$(a);
`````

## Pre Normal


`````js filename=intro
{
  let a$1 = $(1);
  $(a$1);
}
let a = $(2);
$(a);
`````

## Normalized


`````js filename=intro
let a$1 = $(1);
$(a$1);
let a = $(2);
$(a);
`````

## Output


`````js filename=intro
const a$1 /*:unknown*/ = $(1);
$(a$1);
const a /*:unknown*/ = $(2);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
const b = $( 2 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
