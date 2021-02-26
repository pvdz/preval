# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident opt s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 };

    let a = { a: 999, b: 1000 };
    a = (1, 2, b)?.x;
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.x;
    a = tmpChainElementObject;
  }
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const b = { x: 1 };
  let SSA_a = undefined;
  const tmpIfTest = b != null;
  if (tmpIfTest) {
    const tmpChainElementObject = b.x;
    SSA_a = tmpChainElementObject;
  }
  $(SSA_a);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
