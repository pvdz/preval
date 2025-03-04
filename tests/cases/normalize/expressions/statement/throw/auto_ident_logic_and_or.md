# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Throw > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw ($($(1)) && $($(1))) || $($(2));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw ($($(1)) && $($(1))) || $($(2));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpThrowArg = tmpCallCallee(tmpCalleeParam);
if (tmpThrowArg) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpThrowArg = tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
if (tmpThrowArg) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpThrowArg = tmpCallCallee$3(tmpCalleeParam$3);
}
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpThrowArg /*:unknown*/ = $(tmpCalleeParam);
if (tmpThrowArg) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpThrowArg = $(tmpCalleeParam$1);
} else {
}
if (tmpThrowArg) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  tmpThrowArg = $(tmpCalleeParam$3);
}
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {

}
else {
  const d = $( 2 );
  b = $( d );
}
throw b;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
