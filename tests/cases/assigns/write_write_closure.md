# Preval test case

# write_write_closure.md

> Assigns > Write write closure
>
> Testing binding mutation optimizations

#TODO

## Input

`````js filename=intro
let x = $(1);
x = $(2);
$(x);
function f() {
  $(x, 'closure');
}
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  $(x, 'closure');
};
let x = $(1);
x = $(2);
$(x);
f();
`````

## Output

`````js filename=intro
const f = function () {
  $(x, 'closure');
};
let x = $(1);
x = $(2);
$(x);
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - 4: 2, 'closure'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
