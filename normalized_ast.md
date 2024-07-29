A normalized ast would be a nested set of statements, a sort of subset of the regular JS ast.
It would be target JS as an output language even though the ast does not match that specifically.
You could consider this the IR of Preval, although the output is valid JS (just like how asm.js used to do it).

BlockStatement
    list: Statement[]

Statement >
    AssignmentIdentStatement
    AssignmentPropStatement
    AssignmentComputedPropStatement
    BlockStatement                                       // mmmm
    BreakStatement
    CallStatement
    ConstStatement
    EmptyStatement
    ExportNamedDeclaration (?)
    ExpressionStatement
    IfStatement
    ImportDeclaration (?)
    LabelStatement
    LetStatement
    ReturnStatement
    ThrowStatement
    TryStatement
    WhileStatement

AssignmentIdentStatement >
    left: string
    right: Expression

AssignmentPropStatement >
    obj: string
    prop: string
    right: Expression

AssignmentComputedPropStatement >
    obj: string
    prop: string
    right: Expression

BlockStatement >
    body: Statement[]

BreakStatement >
    label?: string                                      // maybe default to empty string rather than null, for that monomorphic yadadada typing

ConstStatement >
    id: string
    init: Expression

DebuggerStatement >
    -                                                   // we (ab)use this as a special kind of header boundary for functions. shouldn't appear otherwise.

EmptyStatemnt >
    -

ExportNamedDeclaration >
    ? TODO

ExpressionStatement
    expr: Expression

IdentStatement >
    name: string

LabelStatement >
    label: string
    body: BlockStatement

LetStatement >
    id: string
    init: Expression

ReturnStatement >
    expression: SimpleExpression

ThrowStatement >
    expression: SimpleExpression

TryStatement >
    body: BlockStatement
    id: string
    trap: BlockStatement

WhileStatement >
    test: SimpleExpression
    body: BlockStatement

Expression >
    ComplexExpression                       // Multi token values or expressions with nested (simple) expressions
    SimpleExpression                        // Primitives and identifiers

ComplexExpression >
    ArrayLiteral
    AwaitExpression
    BinaryExpression
    CallComputedMethodExpression
    CallIdentExpression
    CallMethodExpression
    MemberExpression
    MemberComputedExpression
    ObjectLiteral
    Param                                   // This one is kind of special, maybe this makes them "simple" anyways?
    ThisExpression                          // Should only appear in function header where it gets aliased... if referenced at all
    UnaryExpression
    YieldExpression

SimpleExpression >
    Identifier
    Primitive
    TemplateExpression

ArrayLiteral >
    elements: ArrayLiteralPart[]            // (elements may have holes, those are null in the AST/PST)

ArrayLiteralPart >
    null                                    // hole/elided
    SimpleExpression
    SpreadElement

AwaitExpression >
    arg: SimpleExpression

BinaryExpression >
    op: string                              // + - % ^ etc
    left: SimpleExpression
    right: SimpleExpression

CallArg >
    SimpleExpression
    SpreadElement

CallIdentExpression >
    callee: string
    args: CallArg[]

CallMethodExpression >
    object: SimpleExpression
    prop: string
    args: CallArg[]

CallComputedMethodExpression >
    object: SimpleExpression
    prop: SimpleExpression                  // ident would be slightly simpler but then we wouldn't want to force an extra var for invalid ident names like "delete"
    args: CallArg[]

ClassExpression >
    name: string | null                     // or should this be empty string for none?
    extends: SimpleExpression | null
    body: ClassBody

FunctionExpression >
    name?: string                           // or should this be empty string for none?
    params: Param[]
    async: boolean
    generator: boolean
    body: BlockStatement

MemberExpression >
    object: SimpleExpression
    prop: string

MemberComputedExpression >
    object: SimpleExpression
    prop: SimpleExpression

ObjectLiteral >
    props: (Identifier | PropComputed | PropSpread | PropMethod)[]

Param >
    index: number
    name: string

Primitive >
    type: number, true, false, undefined, null, NaN, Infinity, string

Prop >
    name: string
    value: SimpleExpression

PropComputed >
    name: SimpleExpression
    value: SimpleExpression

PropMethod >
    name: Ident
    isComputed: boolean
    isAsync: boolean
    isGenerator: boolean                    // is this even possible?
    func: FunctionExpression

PropSpread >
    arg: SimpleExpression

RegexLiteral >
    full
    pattern
    flags

SpreadElement >
    arg: SimpleExpression                   // or is this always an ident and so this can be a string?

ThisExpression >
    -                                       // only appears in header of functions to alias the value

UnaryExpression >
    op: string                              // ~ ! + - typeof delete.  not sure if we simply eliminate + and remove - from a "unary"
    prop: SimpleExpression
    if op=delete then prop can be a MemberExpression, do we create a DeleteExpression instead?

YieldExpression >
    arg: SimpleExpression

TemplateExpression >
    strings: string[]                       // Maybe we'll turn every string into a template string (even without dynamic components)
    idents: string[]

Identifier >
    name: string
