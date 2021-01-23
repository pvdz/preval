# Preval test case

# return_sequence.md

> normalize > sequence > return_sequence
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
  {
    let tmpReturnArg = $(2);
    return tmpReturnArg;
  }
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  $(1);
  let tmpReturnArg = $(2);
  return tmpReturnArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: 2
 - 3: undefined

Normalized calls: Same

Final output calls: Same
