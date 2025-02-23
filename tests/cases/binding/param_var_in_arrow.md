# Preval test case

# param_var_in_arrow.md

> Binding > Param var in arrow
>
> Param that also has a var in same scope. Prettier (minified) does this.

## Input

`````js filename=intro
const f = (a) => {
  var a = $(10);
  return a;
}
$(f());
`````

## Pre Normal


`````js filename=intro
const f = ($$0) => {
  let a$1 = $$0;
  debugger;
  a$1 = $(10);
  return a$1;
};
$(f());
`````

## Normalized


`````js filename=intro
const f = function ($$0) {
  let a$1 = $$0;
  debugger;
  a$1 = $(10);
  return a$1;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(10);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
