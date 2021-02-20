# Preval test case

# complex_sequence.md

> Return > Complex sequence
>
> Returning a sequence that ends in a simple node

#TODO

## Input

`````js filename=intro
function f(){ 
  return ($(1), $(2), $(3));
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  $(2);
  const tmpReturnArg = $(3);
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  $(1);
  $(2);
  const tmpReturnArg = $(3);
  return tmpReturnArg;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
