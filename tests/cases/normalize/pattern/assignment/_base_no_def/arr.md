# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
>
> Testing simple pattern normalizations

See https://pvdz.ee/weblog/438 on discussions on transforming this

There are a few things that make the assignment case different from param and binding patterns.

- Assignment allows member expressions as well, which introduce arbitrary expressions in the mix
  - `[$().foo] = obj`
- The existing root node is a regular assignment so we can't lean on the same trick as before, which means that we have to work with fresh `var` bindings and expand into a set of assignments rather than statements or bindings. If the context allows then other steps might still normalize it to individual statements.

## Input

`````js filename=intro
([ x ] = 1);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var x;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var x;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
`````