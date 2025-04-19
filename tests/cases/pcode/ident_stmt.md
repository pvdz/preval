# Preval test case

# ident_stmt.md

> Pcode > Ident stmt
>
> Should compile the ident statement as a `r = r0` sort of (no)op
> Note that the only way for pcode to encounter ident statements in the first place
> is when other phase2 rules leave them behind and loop to phase1 without going
> through normalization first. Totally legit but means we do have to support it.
> An alternate is an implicit global but then it wouldn't be eligible to compile
> to pcode in the first place.

## Options

- pcode

## Input

`````js filename=intro
function f(a = "foo") { 
  return a; 
}

$(f('x'));
$(f());
`````


## Pcode output


`````fileintro
f =
    [ r0 = $$0 - ]
    [ r1 = - undefined ]
    [ r2 === r0 - - undefined ]
    [ if r2 -
      [
        [ r1 = - "foo" ]
        [ return r1 - ]
      ] [
        [ r1 = r0 - ]
        [ return r1 - ]
      ]
    ]
`````




## Todos triggered


None


## Pcode result


Running function "f":

                                    pcode          =>   eval
 - `f()`                       => `"foo"`          => `"foo"`           Ok
 - `f(undefined)`              => `"foo"`          => `"foo"`           Ok
 - `f(null)`                   => `null`           => `null`            Ok
 - `f(true)`                   => `true`           => `true`            Ok
 - `f(false)`                  => `false`          => `false`           Ok
 - `f("")`                     => `""`             => `""`              Ok
 - `f("preval")`               => `"preval"`       => `"preval"`        Ok
 - `f(0)`                      => `0`              => `0`               Ok
 - `f(1)`                      => `1`              => `1`               Ok
 - `f(0, 0)`                   => `0`              => `0`               Ok
 - `f(0, 1)`                   => `0`              => `0`               Ok
 - `f(1, 0)`                   => `1`              => `1`               Ok
 - `f(1, 1)`                   => `1`              => `1`               Ok
 - `f("x")`                    => `"x"`            => `"x"`             Ok