# Preval test case

# early_access_harder.md

> Normalize > Var > Early access harder
>
> Actual early access case

The difficult case here is that the temporal differs from the lexical.

Function `f` is defined at the start, updating `x`. But the first use of `x` happens before the declaration and before the update happens.

#TODO

## Input

`````js filename=intro
function f() {
  x = 10;
}
$(x); // We shouldn't break this being undefined
f();
var x; 
$(x);
`````

## Normalized

`````js filename=intro
var x;
function f() {
  x = 10;
}
$(x);
f();
$(x);
`````

## Output

`````js filename=intro
var x;
function f() {
  x = 10;
}
$(x);
f();
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
