# Preval test case

# return_sequence.md

> Normalize > Sequence > Return sequence
>
> Returning a sequence

#TODO

## Input

`````js filename=intro
function f() {
  return ($(1), $(2))
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  const tmpReturnArg = $(2);
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
  const tmpReturnArg = $(2);
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
 - 3: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
