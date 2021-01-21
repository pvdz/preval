# Preval test case

# sequence-simple.md

> normalize > assignment > return > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
(function(){ return (a, b).c = d; })();
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
tmpNewObj = function () {
  {
    {
      a;
      b.c = d;
    }
    let tmpStmtArg = d;
    return tmpStmtArg;
  }
};
tmpNewObj();
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpNewObj;
let b = { c: 2 };
tmpNewObj = function () {
  b.c = 3;
  return 3;
};
tmpNewObj();
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: 1,{"c":3},"unused",3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
