# Preval test case

# global_block.md

> normalize > hoisting > global_block
>
> Function declarations in a block are not hoisted

#TODO

## Input

`````js filename=intro
function g() {
  {
    let x = 100;  
    function f() {
      return x;
    }
    $(f());
  }
}
g();
`````

## Normalized

`````js filename=intro
function g() {
  {
    let x = 100;
    function f() {
      return x;
    }
    const tmpCallCallee = $;
    const tmpCalleeParam = f();
    tmpCallCallee(tmpCalleeParam);
  }
}
g();
`````

## Output

`````js filename=intro
function g() {
  {
    function f() {
      return 100;
    }
    const tmpCalleeParam = f();
    $(tmpCalleeParam);
  }
}
g();
`````

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
