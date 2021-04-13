# Preval test case

# ifelse_with_escaping_tail_closure_binding.md

> Normalize > Branching > Ifelse with escaping tail closure binding
>
> Regression found while running Preval on Tenko

The problem is that if-else normalization would slice the tail into its own function. But if the tail contained a var decl that was also used in a closure (defined before the if) then the binding would not be accessible anymore, leading to a global variable. 

In this case the function "escapes"; it is passed on into a black hole. It still needs to do what it used to.

#TODO

## Input

`````js filename=intro
const f = function () {
  const g = function () {
    $(xyz, 'g');
  };
  const t = $([g]); // <- preval won't know $ so it can't safely trace `g` from here on out
  if ($) {
    $(1);
  }
  const xyz = $();
  t[0]();
  return g();
};
$(f());
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  const g = function () {
    debugger;
    $(xyz, 'g');
  };
  const t = $([g]);
  if ($) {
    $(1);
  }
  const xyz = $();
  t[0]();
  return g();
};
$(f());
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  const g = function () {
    debugger;
    $(xyz, 'g');
    return undefined;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = [g];
  const t = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function () {
    debugger;
    $(1);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    xyz = $();
    t[0]();
    const tmpReturnArg$3 = g();
    return tmpReturnArg$3;
  };
  let xyz = undefined;
  if ($) {
    const tmpReturnArg$5 = tmpBranchingA();
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = tmpBranchingB();
    return tmpReturnArg$7;
  }
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const g = function () {
  debugger;
  $(xyz, 'g');
  return undefined;
};
const tmpCalleeParam = [g];
const t = $(tmpCalleeParam);
const tmpBranchingC = function () {
  debugger;
  xyz = $();
  t[0]();
  g();
  return undefined;
};
let xyz = undefined;
if ($) {
  $(1);
  tmpBranchingC();
} else {
  tmpBranchingC();
}
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['<function>']
 - 2: 1
 - 3: 
 - 4: undefined, 'g'
 - 5: undefined, 'g'
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
