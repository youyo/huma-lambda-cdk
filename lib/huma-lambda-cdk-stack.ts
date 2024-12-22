import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda_go from "@aws-cdk/aws-lambda-go-alpha";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class HumaLambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const func = new lambda_go.GoFunction(this, "Func", {
      entry: "src",
      runtime: lambda.Runtime.PROVIDED_AL2023,
      architecture: lambda.Architecture.ARM_64,
      layers: [
        lambda.LayerVersion.fromLayerVersionArn(
          this,
          "LambdaAdapterLayerArm64",
          "arn:aws:lambda:ap-northeast-1:753240598075:layer:LambdaAdapterLayerArm64:23"
        ),
      ],
      environment: {
        PORT: "8888",
      },
    });
    func.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });
  }
}
