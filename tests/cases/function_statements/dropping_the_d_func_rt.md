# Preval test case

# dropping_the_d_func_rt.md

> Function statements > Dropping the d func rt
>
> Investigate why the d() function is dropped

Source: https://www.trickster.dev/post/javascript-obfuscation-techniques-by-example/

Afterwards, check if the last example (jsfk) works now. Otherwise fix that too.

--> function statements should be treated as decls and hoisted to the 
top of their func owner scope before further treatment. spec be damned

Note: THIS_IS_DA____ used to get renamed because preval would see the ident
      already used as an implicit global, but would not consider it referencing
      the declared func statement. So it renamed the func, as it would to dedupe.

The fix was to make sure function statements got hoisted to the top of the func
scope in the pre-normalization step.

## Options

- refTest

## Input

`````js filename=intro
function g() {
  $('always here');
}

function f() {
  {
    function THIS_IS_DA____() {
      $('hello');
    }
  }
  $(THIS_IS_DA____());
}
$(f);
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___5__*/ f = function () /*7*/ {
    debugger;
    let /*___12__*/ THIS_IS_DA____$1 = function () /*14*/ {
        debugger;
        $(`hello`);
        return /*___23__*/ undefined;
      };
    let /*___25__*/ tmpCalleeParam = /*___27__*/ THIS_IS_DA____();
    $(/*___31__*/ tmpCalleeParam);
    return /*___34__*/ undefined;
  };
let /*___36__*/ g = function () /*38*/ {
    debugger;
    $(`always here`);
    return /*___47__*/ undefined;
  };
$(/*___51__*/ f);
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
f:
  - w @5       | ########## | 51          | none           | none
  - r @51      | 5

THIS_IS_DA____$1:
  - w @12            | ########## | not read    | none           | none

tmpCalleeParam:
  - w @25            | ########## | 31          | none           | none
  - r @31            | 25

g:
  - w @36            | ########## | not read    | none           | none
