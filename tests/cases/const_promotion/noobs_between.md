# Preval test case

# noobs_between.md

> Const promotion > Noobs between
>
> A let decl with assignment later can be transformed if there are only statements in between with no observable side effects.

#TODO

## Input

`````js filename=intro
let x = $(10);
var a = function(){ return x; }; // Closure, making trivial analysis harder
a = 2;
x = $(20);
$(x, a, 'final');
`````

## Normalized

`````js filename=intro
let a = undefined;
let x = $(10);
a = function () {
  return x;
};
a = 2;
x = $(20);
$(x, a, 'final');
`````

## Output

`````js filename=intro
$(10);
const SSA_x = $(20);
$(SSA_x, 2, 'final');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 20, 2, 'final'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same