# Preval test case

# default_yes__empty.md

> normalize > pattern >  > param > obj > default_yes__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({} = $('pass')) {
  return 'ok';
}
$(f());
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  {
    let $tdz$__pattern_after_default;
    {
      let ifTestTmp = $tdz$__pattern === undefined;
      if (ifTestTmp) {
        $tdz$__pattern_after_default = $('pass');
      } else {
        $tdz$__pattern_after_default = $tdz$__pattern;
      }
    }
  }
  return 'ok';
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    $tdz$__pattern_after_default = $('pass');
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  return 'ok';
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
[['pass'], "<crash[ Cannot destructure '(intermediate value)(intermediate value)(intermediate value)' as it is undefined. ]>"];

Normalized calls: BAD?!
[['pass'], ['ok'], null];

Final output calls: BAD!!
[['pass'], ['ok'], null];

