# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident logic and and
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = $($(1)) && $($(1)) && $($(2));
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let a = $($(1)) && $($(1)) && $($(2));
  $(a);
}
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let a = tmpCallCallee(tmpCalleeParam);
if (a) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  a = tmpCallCallee$1(tmpCalleeParam$1);
  if (a) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    a = tmpCallCallee$3(tmpCalleeParam$3);
  } else {
  }
} else {
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
let a = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 = $(1);
  a = $(tmpCalleeParam$1);
  if (a) {
    const tmpCalleeParam$3 = $(2);
    a = $(tmpCalleeParam$3);
  } else {
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
