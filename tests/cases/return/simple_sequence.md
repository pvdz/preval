# Preval test case

# simple_sequence.md

> Return > Simple sequence
>
> Returning a sequence that ends in a simple node

#TODO

## Input

`````js filename=intro
function f(){ 
  return ($(1), $(2), null);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  $(1);
  $(2);
  const tmpReturnArg = null;
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  $(1);
  $(2);
  return null;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: null
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
