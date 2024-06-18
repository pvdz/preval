# Preval test case

# param_vars_in_arrow.md

> Binding > Param vars in arrow
>
> Param that also has a var in same scope. Prettier (minified) does this.

## Input

`````js filename=intro
const f = (a) => {
  var a = $(10), b = $(20);
  return [a, b];
}
$(f());
`````

## Pre Normal


`````js filename=intro
const f = ($$0) => {
  let a$1 = $$0;
  debugger;
  let b$1 = undefined;
  (a$1 = $(10)), (b$1 = $(20));
  return [a$1, b$1];
};
$(f());
`````

## Normalized


`````js filename=intro
const f = function ($$0) {
  let a$1 = $$0;
  debugger;
  let b$1 = undefined;
  a$1 = $(10);
  b$1 = $(20);
  const tmpReturnArg = [a$1, b$1];
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpClusterSSA_a$1 = $(10);
const b$1 = $(20);
const tmpReturnArg = [tmpClusterSSA_a$1, b$1];
$(tmpReturnArg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
const b = $( 20 );
const c = [ a, b ];
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [10, 20]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
