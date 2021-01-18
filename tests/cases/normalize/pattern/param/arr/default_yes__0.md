# Preval test case

# default_yes__0.md

> normalize > pattern >  > param > arr > default_yes__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([] = $('fail')) {
  return 'bad';
}
$(f(0, 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  {
    let $tdz$__pattern_after_default;
    {
      let ifTestTmp = $tdz$__pattern === undefined;
      if (ifTestTmp) {
        $tdz$__pattern_after_default = $('fail');
      } else {
        $tdz$__pattern_after_default = $tdz$__pattern;
      }
    }
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  return 'bad';
}
var tmpArg;
tmpArg = f(0, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    $tdz$__pattern_after_default = $('fail');
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  [...$tdz$__pattern_after_default];
  return 'bad';
}
var tmpArg;
tmpArg = f(0, 200);
$(tmpArg);
`````

## Result

Should call `$` with:
['<crash[ $ is not a function ]>'];

Normalized calls: BAD?!
['<crash[ <ref> is not defined ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not iterable ]>'];

