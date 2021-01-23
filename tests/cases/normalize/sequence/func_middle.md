# Preval test case

# end.md

> normalize > sequence > end
>
> Nested groups can be flattened. We only care about the normalized output for this case. (I mean, it'll be resolved entirely, obviously)

## Input

`````js filename=intro
function f() {
  ($(1), $(2), ($(3), $(4)), $(5), $(6));
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  $(2);
  $(3);
  $(4);
  $(5);
  $(6);
}
var tmpArg;
('<hoisted var `tmpArg` decl without init>');
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  $(1);
  $(2);
  $(3);
  $(4);
  $(5);
  $(6);
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: 3
 - 3: 4
 - 4: 5
 - 5: 6
 - 6: null
 - 7: undefined

Normalized calls: Same

Final output calls: Same
