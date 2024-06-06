# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident cond complex simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = $(1) ? 2 : $($(100)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = $(1) ? 2 : $($(100)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 2;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
let a = 2;
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
throw a;
`````

## PST Output

With rename=true

`````js filename=intro
let a = 2;
const b = $( 1 );
if (b) {

}
else {
  const c = $( 100 );
  a = $( c );
}
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
