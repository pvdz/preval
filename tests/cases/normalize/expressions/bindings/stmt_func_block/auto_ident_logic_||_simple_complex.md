# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident logic || simple complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = 0 || $($(1));
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let a = 0 || $($(1));
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = 0;
  const tmpBranchingA = function (a$1) {
    const tmpReturnArg = tmpBranchingC(a$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (a$2) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a$2 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg$1 = tmpBranchingC(a$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (a$3) {
    $(a$3);
  };
  if (a) {
    const tmpReturnArg$2 = tmpBranchingA(a);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(a);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(1);
const SSA_a$2 = $(tmpCalleeParam$1);
$(SSA_a$2);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
